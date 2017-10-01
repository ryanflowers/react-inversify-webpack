import * as React from "react";
import * as _ from "lodash";
import { IQuote } from "./Quotes.interfaces";
interface IQuoteFormProps {
    onAddQuote: (quote: IQuote) => void;
}

export class QuoteForm extends React.Component<IQuoteFormProps, IQuote> {
    constructor() {
        super();

        this.resetState();
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // TODO Merge all these field handlers
    private handleAuthorChange(event: any) {
        this.setState(_.extend(this.state, { author: event.target.value }));
    }

    private handleQuoteChange(event: any) {
        this.setState(_.extend(this.state, { quote: event.target.value }));
    }

    private handleSubmit(event: any) {
        this.props.onAddQuote(this.state);
        // TODO only do this on success
        this.resetState();
        event.preventDefault();
    }

    private resetState() {
        this.state = { author: '', quote: '' };
    }

    public render() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor="authorInput">Author</label>&nbsp;
            <input id="authorInput" type="text" value={this.state.author} onChange={this.handleAuthorChange}/>&nbsp;&nbsp;
            <label htmlFor="quoteInput">Quote</label>&nbsp;
            <input id="quoteInput" type="text" value={this.state.quote} onChange={this.handleQuoteChange}/>&nbsp;&nbsp;
            <button type="submit"></button>
        </form>
    }
}