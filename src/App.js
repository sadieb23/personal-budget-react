import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import './App.scss'; // Import SCSS file

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('your-backend-api-url');
      const data = response.data;
      setChartData(data); // Assuming data is an array of chart data
      renderChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderChart = (data) => {
    // Use ChartJS or D3JS to render charts
    // Example ChartJS rendering
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => item.label),
        datasets: [{
          label: 'My Dataset',
          data: data.map((item) => item.value),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Example D3JS rendering
    // You can use D3JS to create more complex visualizations
    const svg = d3.select('#mySVG');
    // D3JS code here
  };

  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
      <div className="chart-container">
        <canvas id="myChart" width="400" height="400"></canvas>
        {/* Add an SVG container for D3JS */}
        <svg id="mySVG" width="400" height="400"></svg>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
