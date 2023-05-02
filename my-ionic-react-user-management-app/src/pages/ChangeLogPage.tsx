import React from 'react';
import { IonItem, IonList, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import GetVersion from "../components/GetVersion";


const ChangeLogPage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <GetVersion />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div>
                    <h6 className='my-textheadline-style'>ChangeLog</h6>
                </div>
                <div>
                    <IonList>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.1</span>
                                <li>Formatting correction</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.0</span>
                                <li>Start version</li>
                            </ul>
                        </IonItem>
                    </IonList>
                </div>

            </IonContent>


        </IonPage>
    );
};

export default ChangeLogPage;
