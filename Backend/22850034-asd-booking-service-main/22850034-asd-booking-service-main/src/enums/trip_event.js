const TripEvent = {
    DRIVER_ACTIVE: 'driver_active',
    DRIVER_CANCEL: 'driver_cancel',
    TRIP_PASSENGER_SUBMIT: 'trip_passenger_submit',
    TRIP_PASSENGER_CANCEL: 'trip_passenger_cancel',
    TRIP_DRIVER_ALLOCATE: 'trip_driver_allocate',
    TRIP_DRIVER_ACCEPT: 'trip_driver_accept',
    TRIP_DRIVER_DECLINE: 'trip_driver_decline',
    TRIP_DRIVER_ARRIVED: 'trip_driver_arrived',
    TRIP_DRIVER_DRIVING: 'trip_driver_driving',
    TRIP_DRIVER_COMPLETED: 'trip_driver_completed'
};

module.exports = TripEvent;