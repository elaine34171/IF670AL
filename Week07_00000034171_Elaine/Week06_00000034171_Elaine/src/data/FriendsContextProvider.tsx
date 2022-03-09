import React, {useState} from 'react';
import FriendsContext, {Friend} from "./friend-context";

const FriendsContextProvider: React.FC = props => {
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 'f1',
            name: 'John Thor',
            photo: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/01/thor-and-celestials.jpg'
        }
    ]);

    const addFriend = (name: string, photo: string) => {
        const newFriend: Friend = {
            id: Math.random().toString(),
            name: name,
            photo: photo
        };

        setFriends((currFriends) => {
            return currFriends.concat(newFriend);
        });
    };

    const updateFriend = (id: string, name: string, photo: string) => {
        const newFriend: Friend = {
            id: id,
            name: name,
            photo: photo
        };

        var counter = 0;
        var isFound = false;

        friends.forEach(friend => {
            if(friend.id === id)
                isFound = true;
            else{
                if(!isFound)
                    counter++;
            }
        });

        friends.splice(counter, 1, newFriend);
    };
    
    const deleteFriend = (id: string) => {
        setFriends(friends.filter(friend => friend.id != id));
    };

    return(
        <FriendsContext.Provider value={{
            friends,
            addFriend,
            updateFriend,
            deleteFriend
        }}>
            {props.children}
        </FriendsContext.Provider>
    );
};

export default FriendsContextProvider;