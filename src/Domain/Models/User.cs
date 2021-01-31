using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class User
    {
        public string Name { get; set; }

        public IEnumerable<Place> Places { get; set; }

        public IEnumerable<Place> PointsOfInterest { get; set; }

        public User()
        {
        }
    }
}
