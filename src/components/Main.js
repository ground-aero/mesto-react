import React, {useState, useEffect} from 'react';
import avatarPath from '../images/avatar.png'
import {logDOM} from "@testing-library/react";

export default function Main(props) {

    return (
        <main className="content">

            <section id="profile" className="profile content__section">
                <span className="profile__avatar-edit-btn">
                    <img className="profile__avatar" src="<%=require('./images/avatar.png')%/>"
                         alt="бюст улыбающегося человека в красной шапке"/>
                </span>
                <div className="profile__elements-wrap">
                    <div className="profile__name-wrap">
                        <h1 className="profile__name">....</h1>
                        <button className="btn profile__btn-edit opacity-transition" type="button"
                                aria-label="edit"></button>
                    </div>
                    <p className="profile__job">..</p>
                </div>
                <button className="btn profile__btn-addplace opacity-transition" type="button"
                        aria-label="add"></button>
            </section>

            <section className="elements content__section">
                <ul className="elements__list">
                </ul>
            </section>

        </main>
    )
}