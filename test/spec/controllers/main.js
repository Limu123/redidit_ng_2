'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl,
        scope,
        logMock,
        locationMock,
        PostdataMock;

    var post;


    // load the controller's module
    beforeEach(module('rediditApp'));

    beforeEach(function() {
        logMock = jasmine.createSpyObj('log', ['debug']),
        locationMock = jasmine.createSpyObj('location', ['path']),
        PostdataMock = jasmine.createSpyObj('Postdata', ['all', 'updateUpvotes', 'updateViews', 'deletePost']);

        module(function($provide) {
            $provide.value('Postdata', PostdataMock);
            $provide.value('$location', locationMock);
        });

        post = {$id: 5, upvotes: 2, views: 7 };
    });

    describe('access data service', function() {



        it('should access postdata service', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            PostdataMock.all.andCallFake(function() { return ['post1']});

            var posts = c.posts;

            expect(PostdataMock.all).toHaveBeenCalled();
        }));

        it('should vote up', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            PostdataMock.updateUpvotes.andCallFake(function() {});

            scope.voteUp(post);

            expect(PostdataMock.updateUpvotes).toHaveBeenCalledWith(5, 3);
            expect(post.upvotes).toBe(3);
            expect(post.upvotes).not.toBe(2);
        }));

        it('should vote down', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            PostdataMock.updateUpvotes.andCallFake(function() {});

            scope.voteDown(post);

            expect(PostdataMock.updateUpvotes).toHaveBeenCalledWith(5, 1);
            expect(post.upvotes).toBe(1);
            expect(post.upvotes).not.toBe(2);
        }));

        it('should show details', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            PostdataMock.updateViews.andCallFake(function() {});
            locationMock.path.andCallFake(function() {});

            scope.showDetail(post);

            expect(PostdataMock.updateViews).toHaveBeenCalledWith(5, 8);
            expect(post.views).toBe(8);
            expect(post.views).not.toBe(7);

            expect(locationMock.path).toHaveBeenCalled();
        }));

        it('should delete a post', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            PostdataMock.deletePost.andCallFake(function() {});

            scope.deletePost(post);

            expect(PostdataMock.deletePost).toHaveBeenCalledWith(post);
            expect(post.upvotes).toBe(2);
            expect(post.views).toBe(7);
        }));
    });
});
