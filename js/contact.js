document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting immediately
    
    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Validate each field
    if (name === "") {
      alert("Please enter your full name.");
      return;
    }
    
    if (email === "" || !validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    if (message === "") {
      alert("Please enter your message.");
      return;
    }
    
    // If validation passes, display success message
    alert("Form submitted successfully!");

    // Optional: Reset form fields
    document.getElementById("contactForm").reset();
  });

  // Email validation function
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }