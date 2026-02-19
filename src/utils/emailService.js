import emailjs from "@emailjs/browser";

// EmailJS configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_ORDER_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || "";
const EMAILJS_CONTACT_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "";

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * Send order confirmation email
 * @param {Object} orderData - Order details
 * @param {string} orderData.customerName - Customer name
 * @param {string} orderData.customerPhone - Customer phone
 * @param {string} orderData.customerLocation - Customer location/address
 * @param {Array} orderData.items - Order items [{title, quantity, price, lineTotal}]
 * @param {number} orderData.subtotal - Order subtotal
 * @param {number} orderData.shipping - Shipping cost
 * @param {number} orderData.total - Order total
 * @returns {Promise} EmailJS send promise
 */
export const sendOrderEmail = async (orderData) => {
  if (
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_ORDER_TEMPLATE_ID
  ) {
    throw new Error(
      "EmailJS is not configured. Please set environment variables."
    );
  }

  // Build order items list (EGP for Egypt)
  const orderItemsList = orderData.items
    .map((item) => `${item.title} × ${item.quantity} — ${item.lineTotal} ج.م`)
    .join("\n");

  // Build email body (EGP for Egypt)
  const emailBody = `--- CUSTOMER DETAILS ---
Name: ${orderData.customerName}
Email: ${orderData.customerEmail || "Not provided"}
Phone: ${orderData.customerPhone}
Location / Address: ${orderData.customerLocation}

--- ORDER ---
${orderItemsList}

Subtotal: ${orderData.subtotal.toFixed(2)} ج.م
Shipping: ${
    orderData.shipping === 0 ? "Free" : `${orderData.shipping.toFixed(2)} ج.م`
  }
Total: ${orderData.total.toFixed(2)} ج.م`;

  const templateParams = {
    to_email: "kareemkhamis2030@gmail.com",
    subject: "Evergrain - New Order",
    message: emailBody,
    customer_name: orderData.customerName,
    customer_email: orderData.customerEmail || "Not provided",
    customer_phone: orderData.customerPhone,
    customer_location: orderData.customerLocation,
    order_total: `${orderData.total.toFixed(2)} ج.م`,
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_ORDER_TEMPLATE_ID,
    templateParams
  );
};

/**
 * Send contact form email
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.subject - Email subject
 * @param {string} contactData.message - Email message
 * @returns {Promise} EmailJS send promise
 */
export const sendContactEmail = async (contactData) => {
  if (
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_CONTACT_TEMPLATE_ID
  ) {
    throw new Error(
      "EmailJS is not configured. Please set environment variables."
    );
  }

  const emailBody = `Name: ${contactData.name}
Email: ${contactData.email}

${contactData.message}`;

  const templateParams = {
    to_email: "kareemkhamis2030@gmail.com",
    subject: contactData.subject || "Message from Evergrain",
    message: emailBody,
    from_name: contactData.name,
    from_email: contactData.email,
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_CONTACT_TEMPLATE_ID,
    templateParams
  );
};
