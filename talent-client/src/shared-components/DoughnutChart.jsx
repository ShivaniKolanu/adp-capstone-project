import Chart from 'chart.js/auto'
import { Line, Doughnut } from "react-chartjs-2";


export default function DoughnutChart(props){

    return (
        <div style={{width: 500, height: 400}}> 
                <Doughnut data={props.data} options={props.options} />
            </div>
    );
    
}