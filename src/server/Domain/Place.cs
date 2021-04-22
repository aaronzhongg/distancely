using System;
namespace Domain
{
    public class Place
    {
        public Place(string address)
        {
            Address = address;
        }

        public string Address { get; }
    }
}
