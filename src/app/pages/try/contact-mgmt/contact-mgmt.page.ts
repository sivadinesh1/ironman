import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Contacts, Contact, ContactFieldType, ContactName, ContactField, IContactFindOptions } from '@ionic-native/contacts/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { async } from 'q';

@Component({
  selector: 'app-contact-mgmt',
  templateUrl: './contact-mgmt.page.html',
  styleUrls: ['./contact-mgmt.page.scss'],
})
export class ContactMgmtPage implements OnInit {

  myContacts: Contact[] = [];
  ourtype: ContactFieldType[] = ['displayName'];

  contactsfound = [];

  constructor(private contacts: Contacts, private callNumber: CallNumber, private sms: SMS,
    private _loadingservice: LoadingService) { 
      this.search('');
    }

  ngOnInit() {
  }

  search(g) {
    const option: IContactFindOptions = {
      filter: g
    }

    this.contacts.find(this.ourtype, option).then(conts => {
      this.contactsfound = conts;
    })

    
  }


  loadContacts() {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };

    this.contacts.find(['*'], options).then((data: Contact[]) => {
      this.myContacts = data;
    });
  }

  sendSMS(contact: Contact) {

    let options = { android: { intent: 'INTENT' } };

    this.sms.send('9585858750', 'hey buddy', options).then(() => {
      this._loadingservice.presentToast('SMS Sent');
    },
      (error: any) => {
        this._loadingservice.presentToast('Error sending SMS contact');
      })
  }

  call(contact: Contact) {
    this.callNumber.callNumber('9585858750', true);
  }

  createContact() {
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, 'ZTest', 'Ztest 1');
    contact.phoneNumbers = [new ContactField('mobile', '9999999999')];
    contact.save().then(
      () => {
        let toast = this._loadingservice.presentToast('Contact Added');
      },
      (error: any) => {
        this._loadingservice.presentToast('Error adding contact');
      }
    )
  }

  onKeyUp(ev) {
    this.search(ev.target.value);
  }

}
