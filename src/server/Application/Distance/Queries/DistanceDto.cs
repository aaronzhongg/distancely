using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Distance.Queries
{
    public class DistanceDto
    {
        public DistanceDto(Place place, int distanceMeters, int travelTimeSeconds)
        {
            Place = place;
            DistanceMeters = distanceMeters;
            TravelTimeSeconds = travelTimeSeconds;
        }

        public Place Place { get; }
        public int DistanceMeters { get; }
        public int TravelTimeSeconds { get; }
    }
}
