import * as React from "react";
import { IQuote } from "./Quotes.interfaces";

export interface IQuotesListProps {
    onDeleteQuote: (quote: IQuote) => void;
    quotes: IQuote[];
}

export class QuotesList extends React.Component<IQuotesListProps, undefined> {
    public render() {
        if(this.props) {
            const listItems = this.props.quotes.map((quote: IQuote) =>
                <li key={quote._id.toString()}>
                    <span>Author: {quote.author}</span>&nbsp;&nbsp;
                    <span>Quote: {quote.quote}</span>
                    <button onClick={() => { this.onPlayQuote(quote)}}><i className="material-icons md-18">play_arrow</i></button>
                    <button onClick={() => { this.onDeleteQuote(quote)}}><i className="material-icons md-18">delete_forever</i></button>
                </li>
            );

            const style ={
                listStyle: 'none'
            };

            return <ul style={style}>{listItems}</ul>
        }
        else {
            return <div>No quotes found.</div>
        }

    }

    private onPlayQuote(quote: IQuote) {
        var msg = new SpeechSynthesisUtterance(quote.quote);
        window.speechSynthesis.speak(msg);
    }

    private onDeleteQuote(quote: IQuote) {
        this.props.onDeleteQuote(quote);
    }
}