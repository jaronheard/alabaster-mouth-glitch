import React from 'react';
import { CivicStoryCard, BarChart, LineChart } from '@hackoregon/component-library';
import Share from './Share';
import '@hackoregon/component-library/assets/global.styles.css';
import { year } from '@hackoregon/component-library/src/utils/formatters.js';

const addCategory = (data, category) => data.map(item => ({...item, type: category}));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] } ;
  }
  
  componentDidMount() {
    fetch('https://service.civicpdx.org/transportation-systems/passenger-census/routes/annual/averages/?route=14')
    .then(response => response.json())
    .then(data => this.setState({ data: [...this.state.data, ...addCategory(data, 'Line 14')] }));
    fetch('https://service.civicpdx.org/transportation-systems/passenger-census/routes/annual/averages/?route=15')
    .then(response => response.json())
    .then(data => this.setState({ data: [...this.state.data, ...addCategory(data, 'Line 15')] }));
  }
  
  render() {
    return (
      <div>
        <CivicStoryCard title='StoryCard Template'>
          <p>You can update this text and things should update automatically. Use the logs to see if there is an error.</p>
          {   this.state.data && this.state.data.length > 0 &&
            <LineChart
              title={'OSCON'}
              subtitle={'Sample Data'}
              data={this.state.data}
              dataKey={'year'}
              dataValue={'total_sum_ons'}
              dataSeries={'type'}
              xNumberFormatter={year}
              xLabel={'Year'}
              yLabel={'Ons'}
            />
          }
        </CivicStoryCard>
        <Share/>
      </div>
    );
  }
};

export default App;