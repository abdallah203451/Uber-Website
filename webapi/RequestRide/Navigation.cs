using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.RequestRide
{
    internal class Navigations
    {
        private TripTypeStrategy tripTypeStrategy;

        public void setStrategy(TripTypeStrategy tripTypeStrategy)
        {
            this.tripTypeStrategy = tripTypeStrategy;
        }

        public void tripDestination(string start, string destination)
        {
            tripTypeStrategy.tripType(start, destination);
        }
        public double calculatedPrice(double kilometers)
        {
            return tripTypeStrategy.Price(kilometers);
        }
        public DateTime calculatedTime(double kilometers)
        {
            return tripTypeStrategy.Time(kilometers);
        }
    }
}
