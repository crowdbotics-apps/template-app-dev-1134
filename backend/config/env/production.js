export default {
  env: 'production',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  //db: 'mongodb://localhost/taxiApp-api-production',
  db: 'mongodb://DBNAME:b34emgec0obgaued884b72vb73@ds121589.mlab.com:21589/DBNAME',
  port: 3066,
  passportOptions: {
    session: false
  },
  radius: 50 / 6371,
  arrivedDistance: 200,
  arrivingDistance: 1000,
  limit: 10,
  skip: 0,
  tripFilter: 'All'
};
