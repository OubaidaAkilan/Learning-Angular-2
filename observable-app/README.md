# ObservableApp

Observables: help apps stay up-to-data and do exciting things when needed, it's like a container for data that app can watch and use it when needed.

Observer: It's responsible to send signals(observer.error,observer.next,observer.complete) to observables.

## Simple example

Think of a weather station as a magical place that tells us what the weather is like outside. But instead of looking out the window, it sends us messages about the weather.

Now, this weather station doesn't just send one message; it can send messages all day long! Sometimes it says, 'It's sunny,' and other times it says, 'It's raining.'

But here's the fun part: the weather station has a magic bell. Whenever there's a new message about the weather, it rings the bell really loudly. Ding-ding!

So, what do we do? We listen for the bell! When we hear it, we run to the weather station and read the message. If it says, 'It's sunny,' we grab our sunglasses and go out to play. If it says, 'It's raining,' we grab our umbrella and stay inside for some cozy indoor fun.

In computer games or apps, we have something called an 'Observable.' It's like our magical weather station. It can send us all sorts of messages, just like the weather station sends us weather updates. And when it has a new message, it rings a 'bell' so the app knows there's something new to see or do!

Breaking it Down:

- `Weather Station`: Represents an `Observable`. It sends messages (data) about the weather (or anything else).

- `Magic Bell`: This is like the `Observable emitting a signal` or notification when there's new data.

- `Listening for the Bell`: In computer terms, this is `'subscribing'` to the Observable to be notified when there's new data.

- `Reading the Message`: Using the new data in the app to take action, just like getting ready for different weather.

```javascript
// Import RxJS
import { Observable } from "rxjs";

// Create an Observable that represents fetching temperature data
const temperatureObservable = new Observable((observer) => {
  // Simulate fetching data after a delay (e.g., from a web service)
  setTimeout(() => {
    const temperature = 25; // Simulated temperature data
    observer.next(temperature); // Send the temperature to subscribers
    observer.complete(); // Signal that the observable is done
  }, 2000); // Simulate a 2-second delay
});

// Subscribe to the Observable
temperatureObservable.subscribe((temperature) => {
  // This function will be called when the temperature data arrives
  console.log(`The current temperature is ${temperature}°C`);
});
```


