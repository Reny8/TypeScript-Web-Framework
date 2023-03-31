import User from "../models/User";
import UserProps from "../models/UserProps";
import { CollectionView } from "./CollectionView";
import { UserEdit } from "./UserEdit";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserEdit(itemParent, model).render();
  }
}
