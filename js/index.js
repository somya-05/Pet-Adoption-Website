
const locationSpan = document.getElementById("loc")


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = "53c8b1790a944c158eae5f492eb71c07"; // Replace with your actual API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.results[0].formatted;
        locationSpan.textContent = location;
        console.log(location)
      })
      .catch(error => console.log(error));
  });
} else {
  locationSpan.textContent = "Geolocation is not supported by this browser.";
}
