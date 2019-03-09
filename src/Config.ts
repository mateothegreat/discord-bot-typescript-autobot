export class Config {

    //
    // Used for commands requiring administration role(s).
    //
    public static readonly ROLES_ADMIN: string[] = [
        'Sudoers',
        'Terabytes'
    ];

    //
    // Used when a use sends the >report command requiring
    // staff assistance.
    //
    public static readonly ROLES_SEND_REPORTS_TO: string[] = [
        'Sudoers',
        'Terabytes'
    ];

}
