import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { database } from '../../firebase'; // Adjust the path as needed
import { ref, onValue, set, remove, get } from 'firebase/database';
import './inventory.scss'

// Modal style with a dark theme
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#a688fa00', // Dark background for the modal
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
    <p className='main-heading1'>Designed for efficiency and accuracy, it offers up-to-the-minute updates
      , ensuring that your data is always current and accessible in a visually engaging interface.
      <br></br><br></br>
      Whether you're tracking inventory or managing tasks, it provides a streamlined 
      solution for all your data needs.
      </p>
      <Box
        width="145vw"
        height="70vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}
        sx={{ bgcolor: '#a688fa00' }} // Set background color to black
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" color="#fff"> {/* White text for modal title */}
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
              sx: {
                bgcolor: '#282828', 
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#777', // Default outline color
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff', // Outline color when hovering
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff', // Outline color when focused
                  },
                  '& input': {
                    color: '#fff', // Text color in the input
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#aaa', // Default label color
                '&.Mui-focused': {
                  color: '#fff', // Label color when focused
                },
              },
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
              sx: {
                bgcolor: '#282828', 
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#777', // Default outline color
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff', // Outline color when hovering
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff', // Outline color when focused
                  },
                  '& input': {
                    color: '#fff', // Text color in the input
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#aaa', // Default label color
                '&.Mui-focused': {
                  color: '#fff', // Label color when focused
                },
              },
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
              sx: {
                bgcolor: '#282828', 
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#777', // Default outline color
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff', // Outline color when hovering
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff', // Outline color when focused
                  },
                  '& input': {
                    color: '#fff', // Text color in the input
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#aaa', // Default label color
                '&.Mui-focused': {
                  color: '#fff', // Label color when focused
                },
              },
            }}
          />

              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemStockCode, itemQuantity, itemDescription);
                  handleClose();
                }}
                sx={{
                  backgroundColor: '#a688fa', // Light grey button background
                  color: '#000', // Black text for button
                  '&:hover': {
                    backgroundColor: '#a688fa', // Slightly darker grey on hover
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

        <Stack direction="row" spacing={2} width="650px">
        <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          sx: {
            bgcolor: '#282828', 
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#777', // Default outline color
              },
              '&:hover fieldset': {
                borderColor: '#fff', // Outline color when hovering
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff', // Outline color when focused
              },
              '& input': {
                color: '#fff', // Text color in the input
              },
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: '#aaa', // Default label color
            '&.Mui-focused': {
              color: '#fff', // Label color when focused
            },
          },
        }}
      />

          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#a688fa', // Light grey button background
              color: '#000', // Black text for button
              '&:hover': {
                backgroundColor: '#a688fa', // Slightly darker grey on hover
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize:'20px',
            }}
          >
            +
          </Button>
        </Stack>

        <Box width="650px" overflow="hidden">
          <Box
            height="70px"
            bgcolor="#8a8a8a73" // Semi-transparent grey for header background
            display="flex"
            justifyContent="left"
            alignItems="center"
            borderRadius="12px"
            marginBottom="5vh"
            paddingLeft="3vw"
          >
            <Typography
              variant="h5"
              color="#fff" // White text for the main heading
              textAlign="left"
              fontWeight="600"
              class="main-heading"
            >
              Inventory
            </Typography>
          </Box>

          <Stack
            height="400px"
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
                width="86%"
                minHeight="80px"
                display="flex"
                alignItems="center"
                bgcolor="#282828" // White background for each inventory item
                paddingX={5}
                borderRadius="12px"
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" // Light shadow for depth
                sx={{
                  overflow: 'hidden', // Prevent content from overflowing
                  whiteSpace: 'nowrap' // Prevent line breaks
                }}
              >
                <Box flexGrow={1} minWidth="0"> {/* Ensures flexible space distribution */}
                  <Typography variant="h6" color="#fff" fontWeight="bold"> {/* Dark text for stock code */}
                    {StockCode.charAt(0).toUpperCase() + StockCode.slice(1)}
                  </Typography>
                  <Typography variant="body3" color="#fff"> {/* Grey text for description */}
                    {Description}
                  </Typography>
                </Box>
                <Box minWidth="100px"> {/* Set a minimum width to accommodate numbers */}
                  <Typography variant="h6" color="#fff" textAlign="center"> {/* Dark text for quantity */}
                    Quantity: {Quantity}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={4} paddingX={5} class="add-remove">
                  <Button
                    variant="contained"
                    onClick={() => addItem(StockCode, 1, Description)}
                    sx={{
                      backgroundColor: '#a486f7', // Light grey button background
                      color: '#000', // Black text for button
                      '&:hover': {
                        backgroundColor: '#a486f7', // Slightly darker grey on hover
                      },
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => removeItem(StockCode)}
                    sx={{
                      backgroundColor: '#a486f7', // Light grey button background
                      color: '#000', // Black text for button
                      '&:hover': {
                        backgroundColor: '#a486f7', // Slightly darker grey on hover
                      },
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    -
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
