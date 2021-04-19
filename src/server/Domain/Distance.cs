namespace Domain
{
    public class Distance
    {
        public Distance(int distanceMeters, double travelTime)
        {
            DistanceMeters = distanceMeters;
            TravelTime = travelTime;
        }

        public int DistanceMeters { get; }
        public double TravelTime { get; }
    }
}
