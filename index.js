let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}




var swiper = new Swiper(".appartment-list", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

var swiper = new Swiper(".fascility-list", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});




  const bookings = [];

  function bookVenue() {
    const venueSelect = document.getElementById('venue');
    const dateInput = document.getElementById('date');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    
    const venue = venueSelect.value;
    const date = dateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    
    const booking = {
      venue,
      date,
      startTime,
      endTime
    };
    
    if (isVenueAvailable(booking)) {
      bookings.push(booking);
      displayBookingDetails();
      alert(`Booking successful: ${venue}, ${date}, ${startTime} - ${endTime}`);
    } else {
      alert(`Booking failed: ${venue}, ${date}, ${startTime} - ${endTime} already booked`);
    }
  }
  
  function isVenueAvailable(booking) {
    for (const existingBooking of bookings) {
      if (
        existingBooking.venue === booking.venue &&
        existingBooking.date === booking.date &&
        (
          (existingBooking.startTime <= booking.startTime && existingBooking.endTime > booking.startTime) ||
          (existingBooking.startTime < booking.endTime && existingBooking.endTime >= booking.endTime) ||
          (existingBooking.startTime >= booking.startTime && existingBooking.endTime <= booking.endTime)
        )
      ) {
        return false;
      }
    }
    return true;
  }
  
  function displayBookingDetails() {
    const table = document.getElementById('bookingTable');
    
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    
    for (const booking of bookings) {
      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${booking.venue}</td>
        <td>${booking.date}</td>
        <td>${booking.startTime}</td>
        <td>${booking.endTime}</td>
        <td>Booked</td>
        <td>${calculatePrice(booking)}</td>
      `;
    }
  }
  
  function calculatePrice(booking) {
    let price = 0;
    const startHour = parseInt(booking.startTime.split(':')[0]);
    const endHour = parseInt(booking.endTime.split(':')[0]);
    
    for (let hour = startHour; hour < endHour; hour++) {
      if (hour >= 10 && hour < 16) {
        price += 100;
      } else if (hour >= 16 && hour < 22) {
        if (booking.venue === 'clubhouse') {
          price += 500;
        } else {
          price += 50;
        }
      }
    }
    
    return price;
  }
    
