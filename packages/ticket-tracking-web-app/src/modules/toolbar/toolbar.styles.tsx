export const styles = (theme: any) => ({
    appLogo: {
        width: "35px",
        height: "35px"
    },
    toolbar: {
        background: "#193b5d"
    },
    toolbarText: {
        "margin-left": "20px",
        "font-weight": 600
    },
    links: {
        "margin-left": "50px",
        height: "64px",
        "& a": {
            padding: "14px 20px",
            color: "#d8d8d8",
            "text-decoration": "none",
            display: "inline-block",
            "font-size": "14px",
        },
        "& a:hover, & a.active": {
            color: "#fff",
            background: "#1f4e7d"
        }
    }
});