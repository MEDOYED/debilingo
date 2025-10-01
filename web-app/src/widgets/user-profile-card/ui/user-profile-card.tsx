import profileLogo from "../../../../public/img/profile-logos/1.jpeg"

export const UserProfileCard = () => {
    return(
        <div>
            <div>
                <img src={profileLogo} alt="" />
                <div>
                    <span>Kuzeluk Andrij</span>
                    <span>@medoyed</span>
                </div>
            </div>
        </div>
    )
}