import React, { createContext, useContext, useState } from 'react';
import { Pin, User } from '../types';

interface PinContextType {
  pins: Pin[];
  user: User;
  addPin: (pin: Omit<Pin, 'id'>) => void;
  savePin: (pinId: string) => void;
  unsavePin: (pinId: string) => void;
  deletePin: (pinId: string) => void;
  getSavedPins: () => Pin[];
  getCreatedPins: () => Pin[];
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export function PinProvider({ children }: { children: React.ReactNode }) {
  const [pins, setPins] = useState<Pin[]>([
    {
      id: '1',
      image:
        'https://i.pinimg.com/736x/a0/a6/34/a0a634862401732ed18483f466824544.jpg',
      title: 'Maomao',
    },
    {
      id: '2',
      image:
        'https://i.pinimg.com/736x/54/77/bb/5477bbffa71c7e193c19289df06c826f.jpg',
      title: 'Majestic Mountain',
    },
    {
      id: '3',
      image:
        'https://i.pinimg.com/736x/c6/20/9a/c6209a5c14180d45408a876d56bbe00f.jpg',
      title: 'Graceful Elegance',
    },
    {
      id: '4',
      image:
        'https://i.pinimg.com/736x/ad/67/c8/ad67c848966a8d11086cdc81050bc83e.jpg',
      title: 'Starlit Horizon',
    },
    {
      id: '5',
      image:
        'https://i.pinimg.com/736x/21/c3/33/21c33330ff2db4045fda6188fbf79dc6.jpg',
      title: 'Celestial Glow',
    },
    {
      id: '6',
      image:
        'https://i.pinimg.com/736x/8f/aa/f9/8faaf9928c41d7d61f301a53e6733304.jpg',
      title: 'Milky Way Bliss',
    },
    {
      id: '7',
      image:
        'https://i.pinimg.com/736x/67/32/1d/67321d7294dc4b0028013a0d14b6f0a9.jpg',
      title: 'Galactic Wonders',
    },
    {
      id: '8',
      image:
        'https://i.pinimg.com/736x/27/99/6a/27996a3ab1da1cf5a7341e32f3c88cdc.jpg',
      title: 'Cosmic Dreams',
    },
    {
      id: '9',
      image:
        'https://i.pinimg.com/736x/14/b0/61/14b061e388765de84b4d223a4a1bfec0.jpg',
      title: 'Night Sky Reflection',
    },
    {
      id: '10',
      image:
        'https://i.pinimg.com/736x/f5/64/04/f564040dc692491705b6076c885e3acc.jpg',
      title: 'Maomao cuties >3<',
    },
    {
      id: '11',
      image:
        'https://i.pinimg.com/736x/85/0c/e0/850ce017cb5845eddae360fc888777ce.jpg',
      title: 'Starry Elegance',
    },
    {
      id: '12',
      image:
        'https://i.pinimg.com/736x/da/a4/94/daa494021348b1a1b7e90aed2e0ab912.jpg',
      title: 'Cosmic Serenity',
    },
    {
      id: '13',
      image:
        'https://i.pinimg.com/736x/d4/4a/ad/d44aad5dc44e6364874c734f64c29930.jpg',
      title: 'Ethereal Glow',
    },
    {
      id: '14',
      image:
        'https://i.pinimg.com/736x/9a/49/39/9a4939ec95319bc8c5f88944077f7a2a.jpg',
      title: 'Twilight Harmony',
    },
    {
      id: '15',
      image:
        'https://i.pinimg.com/736x/26/3a/a7/263aa75cbb4449896a679146993afdfe.jpg',
      title: 'Stellar Journey',
    },
    {
      id: '16',
      image:
        'https://i.pinimg.com/736x/40/87/d2/4087d237417c34f3358a5697df10c4f4.jpg',
      title: 'Nightfall Magic',
    },
    {
      id: '17',
      image:
        'https://i.pinimg.com/736x/78/19/bd/7819bd94f0b38159005e8b80824355a0.jpg',
      title: "Frieren: Beyond Journey's End",
    },
    {
      id: '18',
      image:
        'https://i.pinimg.com/736x/fe/43/5c/fe435c1485091e1df8488bc2907742eb.jpg',
      title: 'Galactic Views',
    },
    {
      id: '19',
      image:
        'https://i.pinimg.com/736x/e4/11/72/e4117262c277d505f1d0a7bd4a67adc3.jpg',
      title: 'Nebula Dreams',
    },
    {
      id: '20',
      image:
        'https://i.pinimg.com/736x/03/70/aa/0370aa864b5eedecb2e9e27d940bb451.jpg',
      title: 'Lo-fi Chill Vibes',
    },
    {
      id: '21',
      image:
        'https://i.pinimg.com/736x/a1/d5/94/a1d594494bad200f62c5cfa72a798fd5.jpg',
      title: 'Maomao',
    },
    {
      id: '22',
      image:
        'https://i.pinimg.com/736x/54/77/bb/5477bbffa71c7e193c19289df06c826f.jpg',
      title: 'Majestic Mountain',
    },
    {
      id: '23',
      image:
        'https://i.pinimg.com/736x/3a/1c/c3/3a1cc31c344507cbdba0daf76e05603f.jpg',
      title: 'Graceful Elegance',
    },
    {
      id: '24',
      image:
        'https://i.pinimg.com/736x/7e/02/20/7e022025b47a9e0ed5bc062825bffe8f.jpg',
      title: 'Starlit Horizon',
    },
    {
      id: '25',
      image:
        'https://i.pinimg.com/736x/89/ad/a9/89ada96a67a5a7a28567b33f473e8188.jpg',
      title: 'Celestial Glow',
    },
    {
      id: '26',
      image:
        'https://i.pinimg.com/736x/49/8d/e6/498de66129d1a998eda4f1418c775e24.jpg',
      title: 'money TT',
    },
    {
      id: '27',
      image:
        'https://i.pinimg.com/736x/ee/d8/0b/eed80bca70df121e3edc2ef161ff9cea.jpg',
      title: 'pay attention',
    },
    {
      id: '28',
      image:
        'https://i.pinimg.com/736x/f6/b7/df/f6b7dfdf7685cccd9edbc726c3871f72.jpg',
      title: 'Cosmic Dreams',
    },
    {
      id: '29',
      image:
        'https://i.pinimg.com/736x/3b/8d/ff/3b8dff7b0178659a2a6b12cb58efba08.jpg',
      title: 'Night Sky Reflection',
    },
    {
      id: '30',
      image:
        'https://i.pinimg.com/736x/d9/11/a0/d911a0fd2b1d3736fb073e6e8b6d296a.jpg',
      title: 'Never gonna give you up',
    },
    {
      id: '31',
      image:
        'https://i.pinimg.com/736x/fe/bb/8c/febb8c59c298aaea712831d7dbd166e8.jpg',
      title: 'chill guy',
    },
    {
      id: '32',
      image:
        'https://i.pinimg.com/736x/f4/ca/f2/f4caf20851ce933e294a3e9999ecbc5e.jpg',
      title: 'Cosmic Serenity',
    },
    {
      id: '33',
      image:
        'https://i.pinimg.com/736x/80/14/36/8014367cc41ed4ae0ec15ca1ac55e8dd.jpg',
      title: 'chill girl',
    },
    {
      id: '34',
      image:
        'https://i.pinimg.com/736x/70/bd/95/70bd952691706e370d0d23944f423ac5.jpg',
      title: 'Twilight Harmony',
    },
    {
      id: '35',
      image:
        'https://i.pinimg.com/736x/8f/86/b3/8f86b39c56f6b061e6e29d06c50658c2.jpg',
      title: 'Stellar Journey',
    },
    {
      id: '36',
      image:
        'https://i.pinimg.com/736x/6f/61/36/6f6136aa47fd1845f3e889fad9d73c78.jpg',
      title: 'Nightfall Magic',
    },
    {
      id: '37',
      image:
        'https://i.pinimg.com/736x/d8/24/48/d824489653ac52a0fd0e0532e39fdf6e.jpg',
      title: "when i wfh",
    },
    {
      id: '38',
      image:
        'https://i.pinimg.com/736x/0f/10/d9/0f10d9d32ae338bda786bcbc30e7f9fc.jpg',
      title: 'Last Game',
    },
    {
      id: '39',
      image:
        'https://i.pinimg.com/736x/4d/ed/3a/4ded3a5d656427d0e34fa57617ac3577.jpg',
      title: 'MOM SAID NO',
    },
    {
      id: '40',
      image:
        'https://i.pinimg.com/736x/dc/0c/ef/dc0cefef0cec270bf3a5b162d9516539.jpg',
      title: 'new home ;-;',
    },
  ]);

  const [user, setUser] = useState<User>({
    id: 'user1',
    savedPins: [],
    createdPins: [],
  });

  const addPin = (newPin: Omit<Pin, 'id'>) => {
    const pin: Pin = {
      ...newPin,
      id: Math.random().toString(36).substr(2, 9),
      createdBy: user.id,
    };
    setPins((prevPins) => [pin, ...prevPins]);
    setUser((prevUser) => ({
      ...prevUser,
      createdPins: [pin.id, ...prevUser.createdPins],
    }));
  };

  const savePin = (pinId: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      savedPins: [...new Set([...prevUser.savedPins, pinId])],
    }));
  };

  const unsavePin = (pinId: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      savedPins: prevUser.savedPins.filter((id) => id !== pinId),
    }));
  };

  const deletePin = (pinId: string) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    setUser((prevUser) => ({
      ...prevUser,
      createdPins: prevUser.createdPins.filter((id) => id !== pinId),
      savedPins: prevUser.savedPins.filter((id) => id !== pinId),
    }));
  };

  const getSavedPins = () => {
    return pins.filter((pin) => user.savedPins.includes(pin.id));
  };

  const getCreatedPins = () => {
    return pins.filter((pin) => user.createdPins.includes(pin.id));
  };

  return (
    <PinContext.Provider
      value={{
        pins,
        user,
        addPin,
        savePin,
        unsavePin,
        deletePin,
        getSavedPins,
        getCreatedPins,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}

export function usePins() {
  const context = useContext(PinContext);
  if (context === undefined) {
    throw new Error('usePins must be used within a PinProvider');
  }
  return context;
}
