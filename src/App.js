import React, { useEffect } from 'react';
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
  useEffect(() => {
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#98fb98',
            '#ff0000',
            '#9370db',
            '#808080',
          ],
        },
      ],
      labels: [],
    };

    const createChart = () => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource,
      });
    };

    const getBudget = () => {
      axios
        .get('/budget')
        .then(function (res) {
          for (
            var i = 0;
            res.data.myBudget && i < res.data.myBudget.length;
            i++
          ) {
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
            createChart();
          }
        })
        .catch(function (error) {
          console.error('Error fetching data:', error);
        });
    };

    createChart();
    getBudget();
  }, []);

<<<<<<< HEAD
  
=======
  const fetchData = async () => {
    try {
      const response = await axios.get('/budget');
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
>>>>>>> 2368ac4f401ba5202286c5c4b5b231b3dc3b23d6

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
      </div>
      <Footer />
    </Router>
  );
}

export default App;
