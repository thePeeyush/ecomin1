type body = {
  amount: number
}

export async function checkout(body: Object) {
    try {
      const response = await fetch(`/api/razorpay/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
      
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }

