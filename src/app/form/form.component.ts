import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { ageValidator } from '../validators/age.validator';

interface AddressData {
  [country: string]: {
    [state: string]: string[];
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  myForm!: FormGroup;
  addressData: AddressData = {
    India: {
      Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
      Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
      Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur'],
      Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
    },
    USA: {
      'New York': ['New York City', 'Buffalo', 'Albany'],
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Texas: ['Houston', 'Austin', 'Dallas'],
    },
    Canada: {
      Ontario: ['Toronto', 'Ottawa', 'Mississauga'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      Alberta: ['Calgary', 'Edmonton', 'Red Deer'],
    },
    Australia: {
      'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
      Queensland: ['Brisbane', 'Gold Coast', 'Cairns'],
      Victoria: ['Melbourne', 'Geelong', 'Ballarat'],
    },
    'United Kingdom': {
      England: ['London', 'Manchester', 'Birmingham'],
      Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
      Wales: ['Cardiff', 'Swansea', 'Newport'],
      'Northern Ireland': ['Belfast', 'Derry', 'Lisburn'],
    },
  };

  countries: string[] = Object.keys(this.addressData);
  states: string[] = [];
  cities: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        cPassword: ['', Validators.required],
        mobile: this.formBuilder.array([
          this.formBuilder.control('', [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/),
          ]),
        ]),
        dob: ['', [Validators.required, ageValidator]],
        address: this.formBuilder.group({
          country: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required],
          street: ['', Validators.required],
          postal: ['', Validators.required],
        }),
        gender: ['', Validators.required],
        agreeToTerms: [false, Validators.requiredTrue],
      },
      { validators: passwordMatchValidator }
    );
  }

  get phoneNumbers() {
    return this.myForm.get('mobile') as FormArray;
  }

  removeMobileNo(i: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(i);
    }
  }

  addMobileNo() {
    this.phoneNumbers.push(
      this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ])
    );
  }

  get updatedCountry() {
    const selectedCountry = this.myForm.get('country')?.value;
    if (selectedCountry) {
      this.states = Object.keys(this.addressData[selectedCountry] || {});
    } else {
      this.states = [];
    }
    return this.states;
  }

  submitForm() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
    // console.log(this.myForm);
  }
}
