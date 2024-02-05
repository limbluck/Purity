import { Component, EventEmitter, Output } from '@angular/core';

interface appComponentOutput {
  chatbarToggle: EventEmitter<never>
}

/**
 * @classdesc
 *   Component to render the chatbar
 * 
 * @section Exit controls
 *   @Output chatbarToggle: EventEmitter<never>
 *     Event to trigger when chatbar is closed
 *   @method chatbarClose(): void
 *     Method to close the chatbar
 * 
 * @section Mode controls
 *   @param chatbarTabCurrent: string
 *     Current mode of the chatbar
 *   @param chatbarTabList: string[]
 *     List of possible chatbar modes
 *   @method chatbarTabChange(modes): void
 *     Method to change current chatbar mode
 *     @input mode: string
 *      Set a new mode by it's name
 *
 * @section Default mode groups controls
 *   @param defaultGroupCurrent: string
 *     Current unfolded group
 *   @param defaultGroupsList: string[]
 *     List of groups
 *   @method defaultGroupStarred(): void
 *     Method to unfold the starred group
 *   @method defaultGroupGroup(): void
 *     Method to unfold the group group
 *   @method defaultGroupPrivate(): void
 *     Method to unfold the private group
 * 
 * @section Contacts mode tabs controls
 *   @param contactsTabCurrent: string
 *     Current contacts tab
 *   @param contactsTabsList: string[]
 *     List of contacts tabs
 *   @param contactsHeader: string
 *     Text to render in contacts tab header
 *   @method contactsTabContacts(): void
 *     Method to show the contacts tab
 *   @method contactsTabRequests(): void
 *     Method to show the requests tab
 * 
 * @section Conversation mode status controls
 *   @param conversationStarred: boolean
 *     Conversation is starred or not (Star svg render status)
 *   @param _conversationMuted: boolean
 *     User is muted or not (Mute svg render status)
 *     @set conversationMuted(status: boolean)
 *       Set new muted status
 *     @get conversationMuted()
 *       Get muted status
 *   @param _conversationBlocked: boolean
 *     User is blocked or not (Block svg render status)
 *     @set conversationBlocked(status: boolean)
 *       Set new blocked status
 *     @get conversationBlocked()
 *       Get blocked status
 * 
 * @section Conversation mode menu controls
 *   @param conversationMenuDropdownShow: boolean
 *     Dropdown status (shown/hidden)
 *   @method cconversationMenuDropdownToggle(): void
 *     Method to toggle the dropdown status
 */
@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrl: './chatbar.component.scss'
})
export class ChatbarComponent implements appComponentOutput {

  // #region Exit controls

    @Output() chatbarToggle: EventEmitter<never> = new EventEmitter<never>();

    chatbarClose(): void {
      this.chatbarToggle.emit();
      setTimeout(() => {
        this.chatbarTabCurrent = 'default';
        this.defaultGroupCurrent = 'none';
      }, 250);
    }

  // #endregion

  // #region Mode controls

    chatbarTabCurrent: string = 'default';
    private readonly chatTabList: string[] = ['default', 'conversation', 'contacts', 'search', 'settings'];

    chatbarTabChange(mode: string): void {
      let found: boolean = false;
      for (let i = 0; i < this.chatTabList.length; i++) {
        if (this.chatTabList[i] === mode) {
          this.chatbarTabCurrent = mode;
          found = true;
        }
      }
      if (!found) {
        this.chatbarTabCurrent = 'default';
      }
      this.defaultGroupCurrent = 'none';
      this.contactsTabContacts()
    }

  // #endregion

  // #region Default mode groups controls

    defaultGroupCurrent: string = 'none';
    defaultGroupsList: string[] = ['none', 'starred', 'group', 'private'];
    
    defaultGroupStarred(): void {
      this.defaultGroupCurrent === 'starred' ? this.defaultGroupCurrent = 'none' : this.defaultGroupCurrent = 'starred';
    }
    defaultGroupGroup(): void {
      this.defaultGroupCurrent === 'group' ? this.defaultGroupCurrent = 'none' : this.defaultGroupCurrent = 'group'
    }
    defaultGroupPrivate(): void {
      this.defaultGroupCurrent === 'private' ? this.defaultGroupCurrent = 'none' : this.defaultGroupCurrent = 'private'
    }
    
    // #endregion
    
  // #region Contacts mode tabs controls
    
    contactsTabCurrent: string = 'contacts';
    contactsTabsList: string[] = ['contacts', 'requests'];
    contactsHeader: string = 'Contacts';

    contactsTabContacts(): void {
      this.contactsTabCurrent = 'contacts'
      this.contactsHeader = 'Contacts';
    }
    contactsTabRequests(): void {
      this.contactsTabCurrent = 'requests'
      this.contactsHeader = 'Requests';
    }

  // #endregion

  // #region Conversation mode status controls

    conversationStarred: boolean = true;

    private _conversationMuted: boolean = false;
    set conversationMuted(status: boolean) {
      this._conversationMuted = status;
      if (status === true) this._conversationBlocked = false;
    }
    get conversationMuted() {
      return this._conversationMuted; 
    }

    private _conversationBlocked: boolean = false;
    set conversationBlocked(status: boolean) {
      this._conversationBlocked = status;
      if (status === true) this._conversationMuted = false;
    }
    get conversationBlocked() {
      return this._conversationBlocked; 
    }

  // #endregion

  // #region Conversation mode menu controls

    conversationMenuDropdownShow: boolean = false;
    conversationMenuDropdownToggle(): void {
      this.conversationMenuDropdownShow = !this.conversationMenuDropdownShow;
    }

  // #endregion

}
