using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.RequestRide
{
    internal class NormalCar : TripTypeStrategy
    {

        public void tripType(string start, string destination)
        {
            Console.WriteLine("Trip with a Normal Car from " + start + " to " + destination);
        }
        public double Price(double kilometers)
        {
            return kilometers * 1.7; 
        }
        public DateTime Time(double kilometers)
        {
            return Convert.ToDateTime(kilometers / 90);        
        }
    }
}
