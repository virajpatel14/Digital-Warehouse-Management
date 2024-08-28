// Backend route to handle product addition
app.post('/api/product', async (req, res) => {
    try {
      // Here you can access the product data from req.body and add it to the order
      // Example: Add product to the order
      const productData = req.body;
      // Add product to order logic...
      
      res.status(200).json({ success: true, message: 'Product added to order successfully' });
    } catch (error) {
      console.error('Error adding product to order:', error);
      res.status(500).json({ success: false, error: 'Failed to add product to order' });
    }
  });
  