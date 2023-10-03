namespace webapi.Implementations
{
    public class Graph
    {
        private const int INF = 2147483647;

        private int V;
        private List<double[]>[] adj;
        public double[] distances { get; set; }
        public Graph(int V)
        {
            // No. of vertices
            this.V = V;
            // In a weighted graph, we need to store vertex av
            // and weight pair for every edge
            this.adj = new List<double[]>[V];

            for (int i = 0; i < V; i++)
            {
                this.adj[i] = new List<double[]>();
            }
        }

        public void AddEdge(int u, int v, double w)
        {
            this.adj[u].Add(new double[] { v, w });
            this.adj[v].Add(new double[] { u, w });
        }

        // Prints shortest paths from src to all other vertices
        public double ShortestPath(int src, int end)
        {
            // Create a priority queue to store vertices that
            // are being preprocessed.
            SortedSet<double[]> pq = new SortedSet<double[]>(new DistanceComparer());

            // Create an array for distances and initialize all
            // distances as infinite (INF)
            double[] dist = new double[V];
            for (int i = 0; i < V; i++)
            {
                dist[i] = INF;
            }

            // Insert source itself in priority queue and initialize
            // its distance as 0.
            pq.Add(new double[] { 0, src });
            dist[src] = 0;

            /* Looping till priority queue becomes empty (or all
                distances are not finalized) */
            while (pq.Count > 0)
            {
                // The first vertex in pair is the minimum distance
                // vertex, extract it from priority queue.
                // vertex label is stored in second of pair (it
                // has to be done this way to keep the vertices
                // sorted by distance)
                double[] minDistVertex = pq.Min;
                pq.Remove(minDistVertex);
                int u = (int)minDistVertex[1];

                // 'i' is used to get all adjacent vertices of a
                // vertex
                foreach (double[] adjVertex in this.adj[u])
                {
                    // Get vertex label and weight of current
                    // adjacent of u.
                    int v = (int)adjVertex[0];
                    double weight = adjVertex[1];

                    // If there is a shorter path to v through u.
                    if (dist[v] > dist[u] + weight)
                    {
                        // Updating distance of v
                        dist[v] = dist[u] + weight;
                        pq.Add(new double[] { dist[v], v });
                    }
                }
            }

            distances = dist;
            // Print shortest distances stored in dist[]
            //Console.WriteLine("Vertex Distance from Source");
            //for (int i = 0; i < V; ++i)
            return dist[end];
        }

        private class DistanceComparer : IComparer<double[]>
        {
            public int Compare(double[] x, double[] y)
            {
                if (x[0] == y[0])
                {
                    return (int)(x[1] - y[1]);
                }
                return (int)(x[0] - y[0]);
            }
        }
    }
}
