import * as React from "react";
import * as _ from "lodash";
import { IQuote } from "./Quotes.interfaces";
interface IQuoteFormProps {
    onAddQuote: (quote: IQuote) => void;
}

export class QuoteForm extends React.Component<IQuoteFormProps, IQuote> {
    constructor() {
        super();

        this.state = { author: '', quote: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // TODO Merge all these field handlers
    handleAuthorChange(event: any) {
        this.setState(_.extend(this.state, { author: event.target.value }));
    }

    handleQuoteChange(event: any) {
        this.setState(_.extend(this.state, { quote: event.target.value }));
    }

    handleSubmit(event: any) {
        this.props.onAddQuote(this.state);
        event.preventDefault();
    }

    public render() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor="authorInput">Author</label>
            <input id="authorInput" type="text" value={this.state.author} onChange={this.handleAuthorChange}/>
            <label htmlFor="quoteInput">Quote</label>
            <input id="quoteInput" type="text" value={this.state.quote} onChange={this.handleQuoteChange}/>
            <br/><br/>
            <button type="submit"></button>
        </form>
    }
}