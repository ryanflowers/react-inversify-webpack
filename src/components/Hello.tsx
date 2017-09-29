import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }
export interface Quote { author: string; quote: string; _id: string;}
interface State {
        quotes: Quote[];
    }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, State> {
    public render() {
        //return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
        if(this.state) {
            const listItems = this.state.quotes.map((quote: Quote) =>
                <li key={quote._id.toString()}>
                    <span>Author: {quote.author}</span>&nbsp;&nbsp;
                    <span>Quote: {quote.quote}</span>
                </li>
            );
            return <ul>{listItems}</ul>
        }
        else {
            return <ul></ul>
        }

    }

    public componentDidMount() {
        var myInit = { method: 'GET',
            cache: 'no-cache' };

        //let url; = 'http://ryanflowers.us-west-1.elasticbeanstalk.com/quotes'
        let url = 'http://localhost:3000/quotes';
        fetch(url, (myInit as any))
            .then((resp) => resp.json()) // Transform the data into json
            .then((data: Quote[]) => {
                this.setState({ quotes: data });
            });
    }
}