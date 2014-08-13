(function( $, undefined ) {
    $.KBWidget({
        name: "KBaseGWASPopKinshipTable",
        parent: "kbaseAuthenticatedWidget",
        version: "1.0.0",
        options: {
            width: 500,
            type:"KBaseGwasData.GwasPopulationKinship"
        },
        workspaceURL: "https://kbase.us/services/ws/",


        init: function(options) {
            this._super(options);

            var self = this;

            if (!this.options.kbCache && !this.authToken()) {
                this.renderError("No cache given, and not logged in!");
            }
            else {
                this.workspaceClient = new Workspace(this.workspaceURL, {token: this.authToken()});
            }

            this.workspaceClient.get_objects([{name : this.options.id, workspace: this.options.ws}], 
                function(data){
                    self.collection = data[0];
                                        
                    self.$elem.append($("<div />").
                    append($("<table/>").addClass("kbgo-table")
                        .append($("<tr/>").append("<td>Gwas Population Object</td><td>" + self.collection.data.GwasPopulation_obj_id+ "</td>"))
                        .append($("<tr/>").append("<td>Gwas Population Variation Object</td><td>" + self.collection.data.GwasPopulationVariation_obj_id+ "</td>"))
                        .append($("<tr/>").append("<td>object_name</td><td>" + self.collection.info[1] + "</td>"))
                        .append($("<tr/>").append("<td>kbase_genome_id</td><td>" + self.collection.data.genome.kbase_genome_id + "</td>"))
                        .append($("<tr/>").append("<td>kbase_genome_name</td><td>" + self.collection.data.genome.kbase_genome_name + "</td>"))
                        .append($("<tr/>").append("<td>source_genome_name</td><td>" + self.collection.data.genome.source_genome_name + "</td>"))
                    ));
                },

                self.rpcError
            );

            return this;
        },

        getData: function() {
            return {
                type:this.options.type,
                id: this.options.id,
                workspace: this.options.ws,
                title: "GWAS Kinship Details",
                draggable: false,
                resizable: false,
                dialogClass: 'no-close'
            };
        }
    });
})( jQuery )