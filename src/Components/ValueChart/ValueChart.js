import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import classes from "./ValueChart.module.css";

const ValueChart = (props) => {
  useEffect(() => {
    let chart = null;
    const ctx = document.getElementById(`myChart`);
    if (!ctx) return;

    const labels = [];
    const data = [];

    props.note.valuesArray.forEach((value, index) => {
      data.push(value);
      labels.push(index);
    });

    labels.push(null);
    data.push(null);

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            borderWidth: 1,
            data: data,
            label: `Knowledge Level`,
            backgroundColor: "rgb(15, 173, 15)",
            tension: 0.2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 0.2,
            },
            suggestedMax: 1,
            title: {
              display: true,
              text: `Knowledge Level`,
              font: {
                size: 16,
              },
              padding: { bottom: 12, right: 4 },
            },
          },
          x: {
            title: {
              display: true,
              text: `Games`,
              font: {
                size: 16,
              },
              padding: { top: 12 },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    return chart;
  });

  let canvas = null;

  if (props.note) {
    canvas = (
      <div className={classes.Chart}>
        <canvas id="myChart"></canvas>
      </div>
    );
  }

  return canvas;
};

export default ValueChart;
