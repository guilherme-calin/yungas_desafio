import React, {Component, ReactNode, Ref} from 'react';
import styles from './PersonDetails.module.scss';

import Person from "../../model/Person";

type Props = {
    person :Person,
    closeHandler :() => void
};
type State = {};

export default class PersonDetails extends Component<Props, State> {
    public state: State;
    public modalRef :any;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): ReactNode {
        return (
            <div ref={this.modalRef} className={`${styles["PersonDetails"]}`}>
                <section className={styles["header-card"]}>
                   <div className={styles["image-subsection"]}>
                       <img alt="Thumbnail de uma pessoa" src={this.props.person.getLargeImageUrl()}/>
                   </div>
                    <div className={styles["name-subsection"]}>
                        <div className={styles["header-information-container"]}>
                            <span className={styles["key"]}>
                                Título : <span className={styles["value"]}>{this.props.person.getTitle()}</span>
                            </span>
                        </div>

                        <div className={styles["header-information-container"]}>
                            <span className={styles["key"]}>
                                Nome : <span className={styles["value"]}>{this.props.person.getFullName()}</span>
                            </span>
                        </div>

                        <div className={styles["header-information-container"]}>
                            <span className={styles["key"]}>
                                Gênero : <span className={styles["value"]}>{this.props.person.getGender() === "male" ? "Masculino" : "Feminino"}</span>
                            </span>
                        </div>
                    </div>
                </section>

                <section className={styles["body-card"]}>
                    <section className={styles["body-section"]}>
                        <p className={styles["title"]}>Informações Pessoais</p>
                        <div>
                            <span className={styles["key"]}>
                                Data de Nascimento : <span className={styles["value"]}>{this.props.person.getFormattedDateOfBirth()}</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles["key"]}>
                                Idade : <span className={styles["value"]}>{this.props.person.getAge()} anos</span>
                            </span>
                        </div>
                    </section>

                    <section className={styles["body-section"]}>
                        <p className={styles["title"]}>Endereço</p>
                        <div>
                            <span className={styles["key"]}>
                                Rua : <span className={styles["value"]}>{this.props.person.getStreet()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Cidade : <span className={styles["value"]}>{this.props.person.getCity()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Estado : <span className={styles["value"]}>{this.props.person.getState()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Região : <span className={styles["value"]}>{this.props.person.getRegion()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Código Postal : <span className={styles["value"]}>{this.props.person.getPostcode()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Latitude : <span className={styles["value"]}>{this.props.person.getLatitude()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Longitude : <span className={styles["value"]}>{this.props.person.getLongitude()}</span>
                            </span>
                        </div>
                    </section>

                    <section className={styles["body-section"]}>
                        <p className={styles["title"]}>Informações de Contato</p>
                        <div>
                            <span className={styles["key"]}>
                                Email : <span className={styles["value"]}>{this.props.person.getEmail()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Telefone : <span className={styles["value"]}>{this.props.person.getTelephone()}</span>
                            </span>
                        </div>

                        <div>
                            <span className={styles["key"]}>
                                Celular : <span className={styles["value"]}>{this.props.person.getCellphone()}</span>
                            </span>
                        </div>
                    </section>
                </section>

                <span className={`${styles["arrow-up-icon"]} ${styles["clickable"]} ${styles["to-darkblue"]}`} onClick={this.props.closeHandler}>
                    <span className={styles["size-maker"]}>DT</span>
                </span>
            </div>
        );
    }

}



