import supabase from "../config/supabase.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};