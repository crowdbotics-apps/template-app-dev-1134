function getBoundry(loc,apiKey) {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc[0]},${loc[1]}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("city=" ,data.results[0].address_components[4].long_name);
            console.log("State=", data.results[0].address_components[6].long_name);
            console.log("Country=" , data.results[0].address_components[7].long_name);
          resolve(data.results[0].address_components[4].long_name);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };
