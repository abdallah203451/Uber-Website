using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net;
using System.Net.Http;
using webapi.Data;
using webapi.Implementations;
using webapi.Migrations;
using webapi.Models;
using webapi.RequestRide;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;

        public PlaceController(ApplicationDbContext appDbContext)
        {
            _Context = appDbContext;
        }

        [HttpGet("from")]
        public async Task<List<string>> GetFromList()
        {
            List<string> from = await _Context.Places.Select(u => u.From).Distinct().ToListAsync();
            return from;
        }

        [HttpGet("to")]
        public async Task<List<string>> GetToList()
        {
            List<string> from = await _Context.Places.Select(u => u.To).Distinct().ToListAsync();
            return from;
        }

        [HttpGet("distance")]
        public async Task<IActionResult> distance(string from, string to, int rideType)
        {
            List<GraphNode> nodes = await _Context.GraphNodes.ToListAsync();
            Dictionary<string, int> idPlaces = new Dictionary<string, int>();
            for (int i = 0; i < nodes.Count(); i++)
            {
                idPlaces.Add(nodes[i].Node, nodes[i].Id);
            }

            List<Place> placesList = await _Context.Places.ToListAsync();
            int V = nodes.Count();
            Graph g = new Graph(V);
            for (int i = 0; i < placesList.Count(); i++)
            {
                g.AddEdge(idPlaces[placesList[i].From] - 1, idPlaces[placesList[i].To] - 1, placesList[i].distance);
            }

            GraphNode fromNode = await _Context.GraphNodes.FirstOrDefaultAsync(u => u.Node == from);
            GraphNode toNode = await _Context.GraphNodes.FirstOrDefaultAsync(u => u.Node == to);
            double distance = g.ShortestPath(fromNode.Id - 1, toNode.Id - 1);
            Navigations navigations = new Navigations();
            if(rideType == 0)
            {
                navigations.setStrategy(new NormalCar());
            }
            else if (rideType == 1)
            {
                navigations.setStrategy(new PremiumCar());
            }
            else
            {
                navigations.setStrategy(new Motorbike());
            }
            double price = navigations.calculatedPrice(distance);
            //DateTime time = navigations.calculatedTime(distance);
            List<double> values = new List<double>() { distance , price };
            List<Driver> drivers = await _Context.Drivers.ToListAsync();
            double minDist = 2147483647;
            Driver driver = null;
            for (int i = 0; i < drivers.Count(); ++i)
            {
                if (g.distances[idPlaces[drivers[i].Position] - 1] < minDist)
                {
                    minDist = g.distances[idPlaces[drivers[i].Position] - 1];
                    driver = drivers[i];
                }
            }
            var parameter = new { distance_ = distance, price_ = price, driver_ = driver , minDist_ = minDist };

            return Ok(new
            {
                Message = "Success!",
                data = parameter
            });
        }
    }
}
