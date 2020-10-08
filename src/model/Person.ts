export default class Person {
    //Informações pessoais
    private gender :string;
    private title :string;
    private firstName :string;
    private lastName :string;

    //Endereço/Localização
    private street :string;
    private city :string;
    private state :string;
    private region :string;
    private postCode :number;
    private latitude :string;
    private longitude :string;
    private timezoneOffset :string;

    //Idade
    private dateOfBirth :Date | null;
    private age:number;
    private registeredDate :Date | null;
    private registeredAge :number;

    //Contato
    private telephoneNumber :string;
    private cellphoneNumber :string;
    private email :string;

    //Imagens
    private thumbnailUrl :string;
    private mediumImageUrl :string;
    private largeImageUrl :string;

    constructor(person : any) {
        this.gender = person?.gender ? person.gender : "";
        this.title  = person?.name?.title ? this.capitalizeFirstLetter(person.name.title, true) : "";
        this.firstName = person?.name?.first ? this.capitalizeFirstLetter(person.name.first)  : "";
        this.lastName = person?.name?.last ? this.capitalizeFirstLetter(person.name.last)  : "";

        this.street = person?.location?.street ? this.capitalizeFirstLetter(person.location.street)  : "";
        this.city = person?.location?.city ? this.capitalizeFirstLetter(person.location.city) : "";
        this.state = person?.location?.state ? this.capitalizeFirstLetter(person.location.state) : "";
        this.region = person?.location?.region ? person.location.region : "";
        this.postCode = person?.location?.postcode ? person.location.postcode : 0;
        this.latitude = person?.location?.coordinates?.latitude ? person.location.coordinates.latitude : "";
        this.longitude = person?.location?.coordinates?.longitude ? person.location.coordinates.longitude : "";
        this.timezoneOffset = person?.location?.timezone?.offset ? person.location.timezone.offset : "";

        this.dateOfBirth = person?.dob?.date ? new Date(person.dob.date) : null;
        this.age = person?.dob?.age ? person.dob.age : 0;
        this.registeredDate = person?.registered?.date ? new Date(person.registered.date) : null;
        this.registeredAge = person?.registered?.age ? person.registered.age : 0;

        this.telephoneNumber = person?.phone ? person.phone : "";
        this.cellphoneNumber = person?.cell ? person.cell : "";
        this.email = person?.email ? person.email : "";

        this.thumbnailUrl = person?.picture?.thumbnail ? person.picture.thumbnail : "";
        this.mediumImageUrl = person?.picture?.medium ? person.picture.medium : "";
        this.largeImageUrl = person?.picture?.large ? person.picture.large : "";
    }

    capitalizeFirstLetter(string :string, skipLengthValidation :boolean = false) {
        let stringArray :string[] = [];
        let capitalizedStringArray :string[] = [];

        stringArray = string.split(" ");

        for(let word of stringArray) {
            let trimmedString = word.trim();

            if(!skipLengthValidation && trimmedString.length <= 2) {
                capitalizedStringArray.push(trimmedString);
            }else {
                capitalizedStringArray.push(word.trim().charAt(0).toUpperCase() + word.trim().slice(1));
            }
        }

        return capitalizedStringArray.join(" ");
    }

    getTitle = () :string => this.title;

    getFullName = () :string => `${this.firstName} ${this.lastName}`;

    getGender = () :string => this.gender;

    getStreet = () :string => this.street;

    getCity = () :string => this.city;

    getState = () :string => this.state;

    getRegion = () :string => this.region;

    getPostcode = () :number => this.postCode;

    getLatitude = () :string => this.latitude;

    getLongitude = () :string => this.longitude;

    getFormattedDateOfBirth = () :string => {
        let dateISOString :string | undefined = this.dateOfBirth?.toISOString();

        if(dateISOString){
            let dateAsString :string = dateISOString.split("T")[0];
            let splitDate :string[] = dateAsString.split("-");

            return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
        }else {
            return ""
        }
    }

    getAge = () :number => this.age;

    getEmail = () :string => this.email;

    getTelephone = () :string => this.telephoneNumber;

    getCellphone = () :string => this.cellphoneNumber;

    getThumbnailUrl = () :string => this.thumbnailUrl;

    getLargeImageUrl = () :string => this.largeImageUrl;
}