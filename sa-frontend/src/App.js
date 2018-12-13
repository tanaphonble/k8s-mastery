import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Polarity from './components/Polarity'
import axios from 'axios'

const style = {
  marginLeft: 12
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentence: '',
      polarity: undefined
    }
  }

  async analyzeSentence() {
    try {
      const response = await axios.post(
        'http://192.168.99.100:30559/sentiment',
        {
          sentence: this.textField.getValue()
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('response', response)
      this.setState(response.data)
    } catch (error) {
      // alert('Something went wrong!')
      console.error('error', error)
    }
  }

  onEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.analyzeSentence()
    }
  }

  render() {
    const polarityComponent =
      this.state.polarity !== undefined ? (
        <Polarity
          sentence={this.state.sentence}
          polarity={this.state.polarity}
        />
      ) : null

    return (
      <MuiThemeProvider>
        <div className="centerize">
          <Paper zDepth={1} className="content">
            <h2>Sentiment Analyser</h2>
            <TextField
              ref={(ref) => (this.textField = ref)}
              onKeyUp={this.onEnterPress.bind(this)}
              hintText="Type your sentence."
            />
            <RaisedButton
              label="Send"
              style={style}
              onClick={this.analyzeSentence.bind(this)}
            />
            {polarityComponent}
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
