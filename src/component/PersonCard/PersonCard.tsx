import React, {Component, ReactNode} from 'react';
import styles from './PersonCard.module.scss';

import Person from "../../model/Person";

type Props = {
    person :Person,
    onClick :(person :Person) => void
};
type State = {};

export default class PersonCard extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render(): ReactNode {
        return (
            <div className={`${styles["PersonCard"]} ${styles["clickable"]} ${styles["to-darkblue"]}`} onClick={() => this.props.onClick(this.props.person)}>
                <section className={styles["thumbnail-section"]}>
                    <img alt="Thumbnail de uma pessoa" src={this.props.person.getLargeImageUrl()}/>
                </section>

                <section className={styles["information-section"]}>
                    <div className={styles["name-info"]}>
                        <span>{this.props.person.getFullName()}</span>
                    </div>

                    <div className={styles["location-info"]}>
                        <p>{this.props.person.getStreet()}</p>
                        <p>{this.props.person.getCity()}</p>
                        <p>{"Região " + this.props.person.getRegion()}</p>
                    </div>
                </section>
            </div>
        );
    }

}



