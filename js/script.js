

    // Function to ask for medication reminder times
    function askForMedicationReminders() {
      const timesPerDay = prompt("How many times a day do you want to take your medicine? (1-3)");
      let reminders = [];

      // Validate input
      if (timesPerDay === '1' || timesPerDay === '2' || timesPerDay === '3') {
        for (let i = 0; i < timesPerDay; i++) {
          const time = prompt(`Enter reminder time for ${i + 1} (e.g., 8:00 AM, 2:00 PM, 8:00 PM):`);
          reminders.push(time);
        }

        // Schedule notifications
        scheduleNotifications(reminders);
      } else {
        alert("Please enter a valid number of times (1-3).");
      }
    }

    // Function to schedule notifications
    function scheduleNotifications(reminders) {
      const now = new Date();
      
      reminders.forEach(reminder => {
        const [time, period] = reminder.split(' '); // Split time and period (AM/PM)
        const [hours, minutes] = time.split(':').map(Number); // Get hours and minutes

        
        let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours + (period.toLowerCase() === 'pm' && hours !== 12 ? 12 : 0), minutes);
        
       
        if (reminderTime < now) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const timeUntilReminder = reminderTime - now;

       
        setTimeout(() => {
          new Notification(`Time to take your medicine!`, {
            body: `Remember to take your medicine before/after meal.`
          });
        }, timeUntilReminder);
      });
    }

    
    document.getElementById("reminder-button").addEventListener("click", () => {
      
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications.");
        return;
      }

     
      if (Notification.permission === "default") {
       
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            askForMedicationReminders();
          } else {
            alert("Notifications are not allowed. Please enable them in your browser settings.");
          }
        });
      } else if (Notification.permission === "granted") {
       
        askForMedicationReminders();
      } else {
        alert("Notifications are not allowed. Please enable them in your browser settings.");
      }
    });

    const fileInput = document.getElementById('upload-prescription');
    const uploadStatus = document.getElementById('upload-status');

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        uploadStatus.textContent = `File selected: ${fileName}`;
      } else {
        uploadStatus.textContent = 'No file selected';
      }
    });
  