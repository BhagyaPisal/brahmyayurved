import supabase from "../config/supabase.js";

export const createOrder = async (req, res, next) => {
  try {
    const { user_id, cart_items, address, total_amount, payment_status } = req.body;

    if (!cart_items || cart_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart cannot be empty",
      });
    }

    // 1️⃣ Create Order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user_id || null,
          address,
          total_amount,
          payment_status: payment_status || "pending",
          order_status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2️⃣ Insert Order Items
    const orderItemsPayload = cart_items.map((item) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) throw itemsError;

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order_id: orderData.id,
    });
  } catch (error) {
    next(error);
  }
};