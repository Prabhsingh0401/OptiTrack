import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { database } from '../../firebase'; // Adjust the path as needed
import { ref, onValue, set, remove, get } from 'firebase/database';
import './inventory.scss'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f0f0f0',
  border: 'none',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemStockCode, setItemStockCode] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setItemStockCode('');
    setItemQuantity('');
    setItemDescription('');
    setOpen(false);
  };

  const updateInventory = async () => {
    const inventoryRef = ref(database, 'masterSheet');
    try {
      onValue(inventoryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const inventoryList = Object.keys(data).map(stockCode => ({
            StockCode: stockCode,
            Quantity: data[stockCode].Quantity,
            Description: data[stockCode].Description,
          }));
          setInventory(inventoryList);
        } else {
          setInventory([]);
        }
      });
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (StockCode, Quantity, Description) => {
    const itemRef = ref(database, `masterSheet/${StockCode}`);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      const currentData = snapshot.val();
      await set(itemRef, { 
        Quantity: currentData.Quantity + parseInt(Quantity),
        Description: Description || currentData.Description
      });
    } else {
      await set(itemRef, { 
        Quantity: parseInt(Quantity),
        Description: Description 
      });
    }
  };

  const removeItem = async (StockCode) => {
    const itemRef = ref(database, `masterSheet/${StockCode}`);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      const currentData = snapshot.val();
      if (currentData.Quantity === 1) {
        await remove(itemRef);
      } else {
        await set(itemRef, { 
          Quantity: currentData.Quantity - 1,
          Description: currentData.Description
        });
      }
    }
  };

  const filteredInventory = inventory.filter(({ StockCode }) =>
    StockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}
        sx={{ bgcolor: '#f7f7f7' }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" color="#333">
              Add Item
            </Typography>
            <Stack width="100%" direction="column" spacing={2}>
              <TextField
                id="outlined-basic"
                label="StockCode"
                variant="outlined"
                fullWidth
                value={itemStockCode}
                onChange={(e) => setItemStockCode(e.target.value)}
                InputProps={{
                  sx: { bgcolor: 'white', borderRadius: '8px' },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                fullWidth
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                InputProps={{
                  sx: { bgcolor: 'white', borderRadius: '8px' },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                fullWidth
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                InputProps={{
                  sx: { bgcolor: 'white', borderRadius: '8px' },
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemStockCode, itemQuantity, itemDescription);
                  handleClose();
                }}
                sx={{
                  backgroundColor: '#e0e0e0',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#d5d5d5',
                  },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Stack direction="row" spacing={2} width="1200px">
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              sx: { bgcolor: 'white', borderRadius: '8px' },
            }}
          />
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#e0e0e0',
              color: '#000',
              '&:hover': {
                backgroundColor: '#d5d5d5',
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Add Item
          </Button>
        </Stack>

        <Box width="1200px" overflow="hidden">
          <Box
            height="100px"
            bgcolor="#8a8a8a73"
            display="flex"
            justifyContent="left"
            alignItems="center"
            borderRadius="12px"
            marginBottom="5vh"
            paddingLeft="3vw"
          >
            <Typography
              variant="h3"
              color="#fff"
              textAlign="center"
              fontWeight="600"
            >
              Inventory
            </Typography>
          </Box>

          <Stack
  height="300px"
  spacing={2}
  sx={{
    overflowY: 'auto',
    overflowX: 'hidden',
    '::-webkit-scrollbar': {
      width: 0,
      height: 0,
    }
  }}
>
  {filteredInventory.map(({ StockCode, Quantity, Description }) => (
    <Box
      key={StockCode}
      width="93.3%"
      minHeight="90px"
      display="flex"
      alignItems="center"
      bgcolor="#ffffff"
      paddingX={5}
      borderRadius="12px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      sx={{
        overflow: 'hidden', // Prevent content from overflowing
        whiteSpace: 'nowrap' // Prevent line breaks
      }}
    >
      <Box flexGrow={1} minWidth="0"> {/* Ensures flexible space distribution */}
        <Typography variant="h5" color="#333" fontWeight="bold">
          {StockCode.charAt(0).toUpperCase() + StockCode.slice(1)}
        </Typography>
        <Typography variant="body1" color="#777">
          {Description}
        </Typography>
      </Box>
      <Box minWidth="100px"> {/* Set a minimum width to accommodate numbers */}
        <Typography variant="h5" color="#333" textAlign="center">
          Quantity: {Quantity}
        </Typography>
      </Box>
      <Stack direction="row" spacing={4} paddingX={5}>
        <Button
          variant="contained"
          onClick={() => addItem(StockCode, 1, Description)}
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#000',
            '&:hover': {
              backgroundColor: '#d5d5d5',
            },
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => removeItem(StockCode)}
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#000',
            '&:hover': {
              backgroundColor: '#d5d5d5',
            },
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  ))}
</Stack>

        </Box>
      </Box>
    </>
  );
}
