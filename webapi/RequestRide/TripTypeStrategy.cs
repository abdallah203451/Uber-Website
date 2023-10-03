using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.RequestRide
{
    internal interface TripTypeStrategy
    {
        public void tripType(string start, string destination);
        public double Price(double kilometers);
        public DateTime Time(double kilometers);

    }
}
