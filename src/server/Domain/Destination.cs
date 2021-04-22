namespace Domain
{
    public class Destination
    {
        public Destination(Place place, int distanceMeters, double travelTime)
        {
            Place = place;
            DistanceMeters = distanceMeters;
            TravelTime = travelTime;
        }

        public Place Place { get; }
        public int DistanceMeters { get; }
        public double TravelTime { get; }
    }
}
