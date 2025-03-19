function Footer() {
    return (
        <footer className="bg-dark d-flex justify-content-center py-2 footer">
            <p className="text-white m-0">@2025 Made by Nhóm 12</p>
            <style>
                {`
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 250px;
                    width: calc(100% - 265px);                     
                }
                `}
            </style>
        </footer>
    );
}

export default Footer;