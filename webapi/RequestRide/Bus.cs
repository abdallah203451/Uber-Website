using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.RequestRide
{
    internal class Bus : TripTypeStrategy
    {
        public void tripType(string start, string destination)
        {
            Console.WriteLine("Trip with a Bus from " + start + " to " + destination);
        }
        public double Price(double kilometers)
        {
            return kilometers * 1; 
        }
        public DateTime Time(double kilometers)
        {
            return Convert.ToDateTime(kilometers / 50);
        }
    }
}
