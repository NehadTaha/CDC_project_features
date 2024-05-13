import React from "react";
import {
    FacebookShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookMessengerShareButton,
} from "react-share";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import "../Styles/style.css"; // Import CSS file for styling

const ShareButton = ({ title, serviceLink, id }) => {
    const collapseId = `shareCollapse-${id}`;

    return (
        <>
            <button
                className="btn rounded-pill fs-6 "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded="false"
                aria-controls={collapseId}
            >
                <FontAwesomeIcon icon={faShareAlt} /> Partager ce Service
            </button>
            <div className="p-2">
                <div className="collapse" id={collapseId}>
                    <div
                        className="card card-body share-buttons-container"
                        style={{
                            boxShadow: "2px 2px 4px black",
                            backgroundColor: "lightgrey",
              
                        }}
                    >
                        <div className="row">
                            <div className="col-6 col-md-3">
                                {" "}
                                {/* Adjust column size for different screen sizes */}
                                <FacebookShareButton url={serviceLink}>
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        size="2x"
                                        className="text-primary"
                                    />
                                </FacebookShareButton>
                            </div>
                            <div className="col-6 col-md-3">
                                {" "}
                                {/* Adjust column size for different screen sizes */}
                                <WhatsappShareButton url={serviceLink} title={title}>
                                    <FontAwesomeIcon
                                        icon={faWhatsapp}
                                        size="2x"
                                        className="text-success"
                                    />
                                </WhatsappShareButton>
                            </div>
                            <div className="col-6 col-md-3">
                                {" "}
                                {/* Adjust column size for different screen sizes */}
                                <EmailShareButton
                                    url={serviceLink}
                                    subject={title}
                                    body={`Découvrez ce service : ${serviceLink}`}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                </EmailShareButton>
                            </div>
                            <div className="col-6 col-md-3">
                                {" "}
                                {/* Adjust column size for different screen sizes */}
                                <FacebookMessengerShareButton
                                    url={serviceLink}
                                    appId="521270401588372"
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebookMessenger}
                                        size="2x"
                                        className="text-primary"
                                    />
                                </FacebookMessengerShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ShareButton.propTypes = {
    title: PropTypes.string.isRequired,
    serviceLink: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ShareButton;
